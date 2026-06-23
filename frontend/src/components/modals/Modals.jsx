import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

const Modals = () => {
  const modalType = useSelector((state) => state.modal.type);

  if (!modalType) {
    return null;
  }

  const Component = modals[modalType];

  return <Component />;
};

export default Modals;