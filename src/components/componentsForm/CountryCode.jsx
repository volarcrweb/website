import PropTypes from 'prop-types';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

const CountryCode = ({ value, onChange }) => {
  return <PhoneInput country={'cr'} enableSearch={true} value={value} onChange={onChange} />;
};

export default CountryCode;

CountryCode.propTypes = { value: PropTypes.string, onChange: PropTypes.func };
