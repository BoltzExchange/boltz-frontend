import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';
import DropZone from '../../../components/dropzone';
import FileUpload from '../../../components/fileupload';
import { lockupTransactionHash } from '../../../constants';

const UploadRefundFileStyles = theme => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '1vh',
    backgroundColor: theme.colors.aeroBlue,
  },
  icon: {
    color: theme.colors.turquoise,
  },
  dropZone: {
    height: '300px',
    zIndex: 2000,
    width: '700px',
    flexDirection: 'column',
    border: `3px dotted ${theme.colors.lightGrey}`,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  info: {
    fontSize: '30px',
    color: theme.colors.tundoraGrey,
  },
});

const StyledUploadRefundFile = ({
  classes,
  setRefundFile,
  setTransactionHash,
  isUploaded,
}) => (
  <View className={classes.wrapper}>
    {isUploaded ? (
      <FaCheckCircle size={240} className={classes.icon} />
    ) : (
      <DropZone className={classes.dropZone} onFileRead={setRefundFile}>
        <p className={classes.info}>Drag the Refund JSON File Here</p>
        <span className={classes.info}>or</span>
        <FileUpload text={'Select file'} onFileRead={setRefundFile} />
      </DropZone>
    )}
    <p className={classes.info}>Paste the lockup transaction hash</p>
    <InputArea
      height={50}
      width={500}
      onChange={setTransactionHash}
      placeholder={`EG: ${lockupTransactionHash}`}
    />
  </View>
);

StyledUploadRefundFile.propTypes = {
  classes: PropTypes.object.isRequired,
  setRefundFile: PropTypes.func.isRequired,
  isUploaded: PropTypes.bool.isRequired,
  setTransactionHash: PropTypes.func.isRequired,
};

const UploadRefundFile = injectSheet(UploadRefundFileStyles)(
  StyledUploadRefundFile
);

export default UploadRefundFile;
