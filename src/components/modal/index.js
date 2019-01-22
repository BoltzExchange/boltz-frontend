import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

const ModalComponent = props => {
  const { isOpen, onClose } = props;
  return (
    <Modal open={isOpen} onClose={onClose} center>
      On 4th of September 2018, In a{' '}
      <a href="https://info.shapeshift.io/blog/2018/09/04/introducing-shapeshift-membership/">
        blogpost
      </a>
      , <br />
      Shapeshift, one of the largest cryptocurrency entities, scummed to user
      data collection. <br />
      By creating an account on a custodial exchange like Shapeshift, you are
      giving government and anyone who can access that KYC data, <br />
      the power to not only know that you have crypto assets but confiscate them
      during a trade. <br />
      We built Boltz with a dream of a fairer financial world, with a primary
      goal to empower users with financial sovereignty. <br />
      Therefore, Boltz does not and will never collect any personal data from
      users. <br />
      Also, Boltz leverages advanced cryptography ("atomic swaps") in a way, so
      that trades either complete in full or get refunded automatically. <br />
      Users can rest assured to be in possession of their funds at all times,
      without worrying about who is behind Boltz <br />
      and if this entity is trustworthy. <br />
      Because trading <b>shouldn't</b> require an account.
    </Modal>
  );
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default ModalComponent;
