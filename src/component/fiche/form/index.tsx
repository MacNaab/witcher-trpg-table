import Input from './input';
import Number from './number';
import Select from './select';

export function FormObject(form: any) {
  const myObject: any = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < form.length; i++) {
    const n = form[i].name;
    if (n) {
      const v = form[i].value;
      if (v) {
        myObject[n] = v;
      }
    }
  }
  return myObject;
}

export default function sample({ data }: any) {
  switch (data.type) {
    case 'input':
      return <Input data={data} />;
    case 'number':
      return <Number data={data} />;
    case 'select':
      return <Select data={data} />;
    default:
      return null;
  }
}
