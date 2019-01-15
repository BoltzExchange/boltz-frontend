import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';
import DropZone from '../../../components/dropzone';
import FileUpload from '../../../components/fileupload';

const UploadRefundFileStyles = theme => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '1vh',
    backgroundColor: theme.colors.aeroBlue,
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
}) => (
  <View className={classes.wrapper}>
    <DropZone className={classes.dropZone} onFileRead={setRefundFile}>
      <p className={classes.info}>Drag the Refund JSON file here</p>
      <span className={classes.info}>or</span>
      <FileUpload text={'Select file'} onFileRead={setRefundFile} />
    </DropZone>

    <p className={classes.info}>Lockup transaction hash</p>
    <InputArea
      height={150}
      width={500}
      onChange={setTransactionHash}
      placeholder={
        '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098'
      }
    />
  </View>
);

StyledUploadRefundFile.propTypes = {
  classes: PropTypes.object.isRequired,
  setRefundFile: PropTypes.func.isRequired,
  setTransactionHash: PropTypes.func.isRequired,
};

const UploadRefundFile = injectSheet(UploadRefundFileStyles)(
  StyledUploadRefundFile
);

export default UploadRefundFile;
