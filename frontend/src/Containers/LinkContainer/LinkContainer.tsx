import { Container } from '@mui/joy';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { ILinkForm } from '../../types';

const LinkContainer = () => {

  const addLink = (link: ILinkForm) => {
    console.log(link);
  };

  return (
    <Container>
      <FormElement addLink={addLink}/>
    </Container>
  );
};

export default LinkContainer;