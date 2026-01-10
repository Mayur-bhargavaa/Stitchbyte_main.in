import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { restaurantId, tableNumbers } = body as {
      restaurantId: string;
      tableNumbers: number[];
    };

    if (!restaurantId || !tableNumbers?.length) {
      return NextResponse.json({ error: "Missing restaurantId or tableNumbers" }, { status: 400 });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    // Upsert tables and collect them
    const tables = await Promise.all(
      tableNumbers.map(async (num) => {
        const token = `${restaurant.slug}-${num}-${crypto.randomBytes(4).toString("hex")}`;
        
        const existing = await prisma.table.findFirst({
          where: { restaurantId, number: num },
        });

        if (existing) {
          return existing;
        }

        return prisma.table.create({
          data: {
            restaurantId,
            number: num,
            token,
          },
        });
      })
    );

    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const appUrl = process.env.APP_URL || "http://localhost:3000";

    for (const table of tables) {
      const menuUrl = `${appUrl}/menu/${restaurant.slug}/${table.token}`;

      // Generate QR as PNG buffer
      const qrDataUrl = await QRCode.toDataURL(menuUrl, {
        type: "image/png",
        width: 250,
        margin: 1,
        errorCorrectionLevel: "H",
      });

      // Convert data URL to bytes
      const qrImageBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
      const qrImage = await pdfDoc.embedPng(qrImageBytes);

      // Add a page (A4 size: 595.28 x 841.89 points)
      const page = pdfDoc.addPage([595.28, 841.89]);
      const { width, height } = page.getSize();

      // Restaurant name (centered at top)
      const titleText = restaurant.name;
      const titleWidth = helveticaBold.widthOfTextAtSize(titleText, 24);
      page.drawText(titleText, {
        x: (width - titleWidth) / 2,
        y: height - 60,
        size: 24,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      // "Table QR Codes" subtitle
      const subtitleText = "Table QR Codes";
      const subtitleWidth = helvetica.widthOfTextAtSize(subtitleText, 12);
      page.drawText(subtitleText, {
        x: (width - subtitleWidth) / 2,
        y: height - 85,
        size: 12,
        font: helvetica,
        color: rgb(0, 0, 0),
      });

      // Table number
      const tableText = `Table ${table.number}`;
      const tableWidth = helveticaBold.widthOfTextAtSize(tableText, 20);
      page.drawText(tableText, {
        x: (width - tableWidth) / 2,
        y: height - 140,
        size: 20,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      // QR Code (centered)
      const qrSize = 250;
      const qrX = (width - qrSize) / 2;
      const qrY = height - 420;
      page.drawImage(qrImage, {
        x: qrX,
        y: qrY,
        width: qrSize,
        height: qrSize,
      });

      // URL text below QR
      const urlWidth = helvetica.widthOfTextAtSize(menuUrl, 10);
      page.drawText(menuUrl, {
        x: (width - urlWidth) / 2,
        y: qrY - 30,
        size: 10,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3),
      });

      // Instruction text
      const instructionText = "Scan to view menu & order";
      const instructionWidth = helvetica.widthOfTextAtSize(instructionText, 12);
      page.drawText(instructionText, {
        x: (width - instructionWidth) / 2,
        y: qrY - 55,
        size: 12,
        font: helvetica,
        color: rgb(0, 0, 0),
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${restaurant.slug}-qr-codes.pdf"`,
      },
    });
  } catch (error) {
    console.error("QR PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
