type Props = { title?: string };

const ExistingCSVComponent: React.FC<Props> = ({ title }) => {
  return (
    <>
      <div>{title}</div>
      <div>Edit Button</div>
    </>
  );
};

export default ExistingCSVComponent;
