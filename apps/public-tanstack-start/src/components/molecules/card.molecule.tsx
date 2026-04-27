import CardComponent from '@portfolio/design-system/card';
import CardContentComponent from '@portfolio/design-system/card-content';
import CardDescriptionComponent from '@portfolio/design-system/card-description';
import CardFooterComponent from '@portfolio/design-system/card-footer';
import CardHeaderComponent from '@portfolio/design-system/card-header';
import CardTitleComponent from '@portfolio/design-system/card-title';

const Card = Object.assign(CardComponent, {
  Content: CardContentComponent,
  Description: CardDescriptionComponent,
  Footer: CardFooterComponent,
  Header: CardHeaderComponent,
  Title: CardTitleComponent,
});

export default Card;
