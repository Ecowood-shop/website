// Export input styles
export const InputStyles = `

input {    
  border: none;
  outline: none;
  border-radius: 100px;

  font-size: var(--small-l);
  padding-left: 30px;
  text-transform: capitalize;


  [id*="placeholder"] {
    text-transform: capitalize;
  }

  &::placeholder {
    text-transform: capitalize;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    text-transform: capitalize;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    text-transform: capitalize;
  }
}

`;
