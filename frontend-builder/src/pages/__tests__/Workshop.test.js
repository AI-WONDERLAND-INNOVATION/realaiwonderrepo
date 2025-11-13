import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Workshop from '../Workshop';

describe('Workshop page', () => {
  it('renders all input fields and button', () => {
    render(<Workshop colorizeText={x => x} />);
    expect(screen.getByPlaceholderText(/Enter your AI API key/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/AI feature/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name your app/i)).toBeInTheDocument();
    expect(screen.getByText(/Create App/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Key/i)).toBeInTheDocument();
  });

  it('saves API key to localStorage', () => {
    render(<Workshop colorizeText={x => x} />);
    const input = screen.getByPlaceholderText(/Enter your AI API key/i);
    fireEvent.change(input, { target: { value: 'test-key-123' } });
    fireEvent.click(screen.getByText(/Save Key/i));
    expect(window.localStorage.getItem('ai_api_key')).toBe('test-key-123');
  });

  it('toggles AI features', () => {
    render(<Workshop colorizeText={x => x} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0].checked).toBe(false);
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0].checked).toBe(true);
  });

  it('shows confirmation after submitting', () => {
    render(<Workshop colorizeText={x => x} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your AI API key/i), { target: { value: 'test-key' } });
    fireEvent.change(screen.getByPlaceholderText(/AI feature/i), { target: { value: 'Chatbot' } });
    fireEvent.change(screen.getByPlaceholderText(/Name your app/i), { target: { value: 'WonderBot' } });
    fireEvent.click(screen.getByText(/Create App/i));
    expect(screen.getByText(/App "WonderBot" with AI feature "Chatbot" created using API key "test-key"!/i)).toBeInTheDocument();
  });

  it('renders colorized text if colorizeText is provided', () => {
    const colorizeText = jest.fn(x => x.split('').map((c, i) => <span key={i} style={{ color: `hsl(${i*30},100%,50%)` }}>{c}</span>));
    render(<Workshop colorizeText={colorizeText} />);
    expect(colorizeText).toHaveBeenCalledWith('AI Workshop');
  });
});
