import { NumericFormat } from 'react-number-format';

const NumberFormatCustom = (props: any) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value, // giá trị gốc (123000)
          },
        });
      }}
    />
  );
};

export default NumberFormatCustom
