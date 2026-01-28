import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'BandForce - Resistance Bands & Fitness Accessories',
    description: 'Resistance bands and fitness accessories for all fitness levels. Shop quality workout gear with fast US shipping.',
    keywords: 'resistance bands, fitness accessories, workout equipment, strength training, exercise',
};

export default Meta;