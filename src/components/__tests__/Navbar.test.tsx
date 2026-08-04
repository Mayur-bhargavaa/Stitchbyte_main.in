import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

// Mock next/image
vi.mock('next/image', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} />;
  },
}));

describe('Navbar Component', () => {
  it('renders Navbar correctly on desktop screen', () => {
    render(<Navbar />);
    
    // Check that main desktop links exist
    expect(screen.getByText('Prebuilt')).toBeInTheDocument();
    expect(screen.getByText('Customized')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('UI & UX')).toBeInTheDocument();
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('toggles mobile menu dropdown when hamburger button is clicked', () => {
    render(<Navbar />);

    // Mobile menu starts closed, check that mobile links are not visible
    // In this component, mobile menu list is conditionally rendered
    const initialLinks = screen.queryAllByRole('link', { name: 'Prebuilt' });
    // Should render only the desktop link since mobile menu is closed
    expect(initialLinks.length).toBe(1);

    // Find the toggle button
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();

    // Click to open
    fireEvent.click(toggleButton);

    // Now mobile links should be visible in the DOM
    const openLinks = screen.getAllByRole('link', { name: 'Prebuilt' });
    // Should render both desktop and mobile version
    expect(openLinks.length).toBe(2);

    // Click again to close
    fireEvent.click(toggleButton);

    // Mobile links should be gone
    const closedLinks = screen.getAllByRole('link', { name: 'Prebuilt' });
    expect(closedLinks.length).toBe(1);
  });
});
