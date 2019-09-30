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
    flex: '1 0 100%',
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
    '@media (max-width: 425px)': {
      width: '100%',
      border: 'none',
    },
  },
  info: {
    fontSize: '30px',
    color: theme.colors.tundoraGrey,
    '@media (max-width: 425px)': {
      fontSize: '18px',
    },
  },
  mobileInfo: {
    '@media (max-width: 320px)': {
      fontSize: '16px',
    },
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
        <p className={classes.info}>Drag the refund.png file here</p>
        <span className={classes.info}>or</span>
        <FileUpload
          text={'Select file'}
          onFileRead={setRefundFile}
          acceptMimeType={'image/png'}
        />
      </DropZone>
    )}
    <p className={`${classes.info} ${classes.mobileInfo}`}>
      Paste the hash of the lockup transaction
    </p>
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
