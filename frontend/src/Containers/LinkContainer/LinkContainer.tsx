import { Container } from '@mui/joy';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { ILinkForm } from '../../types';
import { useAppDispatch } from '../../app/hooks.ts';
import { addLink } from '../../store/linksThunk.ts';

const LinkContainer = () => {
  const dispatch = useAppDispatch();

  const addNewLink = (link: ILinkForm) => {
    console.log(link);
    dispatch(addLink(link));
  };

  return (
    <Container>
      <FormElement addLink={addNewLink}/>
    </Container>
  );
};

export default LinkContainer;