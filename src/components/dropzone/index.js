import React from 'react';
import PropTypes from 'prop-types';
import View from '../view';

class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.ref.current.addEventListener('mouseup', this.onDragLeave);
    this.ref.current.addEventListener('dragenter', this.onDragEnter);
    this.ref.current.addEventListener('dragover', this.onDragOver);
    this.ref.current.addEventListener('drop', this.onDrop);
  }

  componentWillUnmount() {
    this.ref.current.removeEventListener('mouseup', this.onDragLeave);
    this.ref.current.removeEventListener('dragenter', this.onDragEnter);
    this.ref.current.addEventListener('dragover', this.onDragOver);
    this.ref.current.removeEventListener('drop', this.onDrop);
  }

  onDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.items[0].getAsFile();

    const reader = new window.FileReader();
    reader.onload = () => {
      this.props.onFileRead(reader.result);
    };

    reader.readAsText(file);

    this.setState({ active: false });
    return false;
  };

  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  onDragLeave = e => {
    this.setState({ active: false });
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  onDragEnter = e => {
    this.setState({ className: true });
    e.stopPropagation();
    e.preventDefault();
    return false;
  };

  render() {
    const {
      className,
      style,
      children,
      width,
      height,
      ...otherProps
    } = this.props;
    return (
      <View
        className={className}
        style={{ width: width, height: height, ...style }}
        inputRef={this.ref}
        {...otherProps}
      >
        {children}
      </View>
    );
  }
}

DropZone.protoTypes = {
  className: PropTypes.string,
  children: PropTypes.children,
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  onFileRead: PropTypes.func.isRequired,
};

export default DropZone;
