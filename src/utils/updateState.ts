export const updateState = (
  setState: React.Dispatch<React.SetStateAction<any>>,
  fieldName: string,
  value: any,
) => {
  setState((prevState: any) => ({
    ...prevState,
    [fieldName]: value,
  }));
};
