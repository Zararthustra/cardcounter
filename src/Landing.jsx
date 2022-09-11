

export const Landing = ({setTeamReady}) => {

  return (
    <div>
      <button onClick={() => setTeamReady(true)}>Team Ready</button>
    </div>
  );
};
