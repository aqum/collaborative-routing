import * as React from 'react';

interface ICrFormProps {
  onSubmit: (data) => void;
  className: string;
};

export class CrForm extends React.Component<ICrFormProps, {}> {
  formRef;

  handleSubmit(event) {
    event.preventDefault();

    const formData: any = new FormData(this.formRef);
    const data = Array.from(formData.keys())
      .reduce(
        (result, key: any) => Object.assign(
          result,
          {[key]: formData.get(key)},
        ),
        {},
      );

    this.props.onSubmit(data);
  }

  render() {
    return (
      <form
        className={this.props.className}
        onSubmit={this.handleSubmit.bind(this)}
        ref={ref => this.formRef = ref}
      >
        {this.props.children}
      </form>
    );
  }
}
