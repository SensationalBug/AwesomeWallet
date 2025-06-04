export const updateState = (
  setState: React.Dispatch<React.SetStateAction<any>>,
  fieldName: string,
  value: string,
) => {
  setState((prevState: any) => ({
    ...prevState,
    [fieldName]: value,
  }));
};
