import { FormattedMessage, injectIntl } from "react-intl";

type InjectMassageProps = any;

const InjectMassage = (props:InjectMassageProps) => <FormattedMessage {...props} />;
export default injectIntl(InjectMassage);
