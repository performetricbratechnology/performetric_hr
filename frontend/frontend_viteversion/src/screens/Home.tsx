type Props = {
  status: string;
};

function Home({ status }: Props) {
  return (
    <div>
      <h1>Página Inicial</h1>
      <p>Status da API: {status}</p>
    </div>
  );
}



export default Home;
