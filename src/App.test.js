import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';


describe("Should have game board", () => {
  it("Should have a board", () => {
    render(<App />);
    const board = screen.getAllByTestId('gameBoard');
    expect(board).not.toBeNull();
  })


  it("Should have a 9 sqaures", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    expect(squares.length).toBe(9)
  })

  it("Should have a 9 sqaures with empty values", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    squares.forEach((sq) => {
      expect(sq.textContent).toBe('')
    })
  })

})

describe("Tic Tac Toe Functionality", () => {
  it("Should alternate player after each turn", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X');
    fireEvent.click(squares[1]);
    expect(squares[1].textContent).toBe('O');
  });

  it("Should alternate turns", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X');
    fireEvent.click(squares[2]);
    expect(squares[2].textContent).toBe('O');
  });

  it("Should correctly diplay X as winner", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);
    const status = screen.getByTestId("status");
    expect(status.textContent).toBe('Status : Winner is X');
  });

  
  it("Should correctly diplay O as winner", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[4]);
    fireEvent.click(squares[0])
    fireEvent.click(squares[6]);
    fireEvent.click(squares[2]);
    fireEvent.click(squares[5]);
    fireEvent.click(squares[1]);
    const status = screen.getByTestId("status");
    expect(status.textContent).toBe('Status : Winner is O');
    fireEvent.click(squares[5]);
  });

  it("Should correctly diplay draw", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[4]);
    fireEvent.click(squares[0])
    fireEvent.click(squares[1]);
    fireEvent.click(squares[2]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[5]);
    fireEvent.click(squares[6]);
    fireEvent.click(squares[7]);
    fireEvent.click(squares[8]);
    const status = screen.getByTestId("status");
    expect(status.textContent).toBe('Status : Draw');
    fireEvent.click(squares[5]);
  });

  it("Should change winning line color to green", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[4]);
    fireEvent.click(squares[0])
    fireEvent.click(squares[6]);
    fireEvent.click(squares[2]);
    fireEvent.click(squares[5]);
    fireEvent.click(squares[1]);
    [0,1,2].forEach((i)=> {expect(squares[i]).toHaveStyle('backgroundColor: green') ;});
    [3,4,5,6,7,8].forEach((i)=> {expect(squares[i]).toHaveStyle('backgroundColor: white') ;});
  });

  it("Should not update square if game over", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);
    const status = screen.getByTestId("status");
    expect(status.textContent).toBe('Status : Winner is X');
    fireEvent.click(squares[5]);
    expect(squares[5].textContent).toBe('');
  });

  it("Should not update square if already marked", () => {
    render(<App />);
    const squares = screen.getAllByTestId('square');
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X');
    fireEvent.click(squares[0])
    expect(squares[0].textContent).toBe('X');
    fireEvent.click(squares[2]);
    expect(squares[2].textContent).toBe('O');
    fireEvent.click(squares[2])
    expect(squares[2].textContent).toBe('O');
  });

  it("Should reset game on presseing reset button", () => {
    render(<App />);
    const reset = screen.getAllByTestId('reset');
    fireEvent.click(reset[0])
    const squares = screen.getAllByTestId('square');
    squares.forEach((sq) => {
      expect(sq.textContent).toBe('')
    })
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X');
  });



});