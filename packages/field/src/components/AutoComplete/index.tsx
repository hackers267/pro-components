import React from 'react';
import { AutoComplete } from 'antd';
import type { SelectProps } from 'antd';
import type { ProFieldFC } from '../../index';

export type FieldAutoCompleteProps = {
  placeholder?: any;
  options?: SelectProps<any>['options'] | string[];
};

const FieldAutoComplete: ProFieldFC<FieldAutoCompleteProps> = (
  { text, mode: type, render, renderFormItem, options, placeholder, fieldProps },
  ref,
) => {
  if (type === 'read') {
    const dom = <span ref={ref}>{text}</span>;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const autoCompleteOptions = options?.map((x) =>
      typeof x === 'string' ? { value: x, label: x } : x,
    );

    const dom = <AutoComplete ref={ref} options={autoCompleteOptions} placeholder={placeholder} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldAutoComplete);
