import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders an input with the correct placeholder', () => {
    render(<SearchBar onSearch={() => {}} placeholder="Search..." />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch with the input value after a debounce', async () => {
    jest.useFakeTimers();
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} placeholder="Search..." />);
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    // The onSearch function should not be called immediately
    expect(handleSearch).not.toHaveBeenCalled();

    // Fast-forward time by 500ms
    jest.advanceTimersByTime(500);

    // Now the onSearch function should have been called
    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith('test');

    jest.useRealTimers();
  });
}); 