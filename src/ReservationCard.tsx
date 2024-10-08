interface ResProps {
  userName: string;
}

function ReservationCard({ userName }: ResProps) {
  return <div>{userName}</div>;
}

export default ReservationCard;
