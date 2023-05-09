import { Link } from "@mui/material";

export const formatTime = (duration) => {
  const mins = ~~(duration / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  ret += "" + mins + " min " + (secs < 10 ? "0" : "");
  ret += "" + secs + " sec";

  return ret;
}

export const StyledLink = ({to, contents}) => {
    return (
        <Link href={to} color="#1976d2" underline="hover">{contents}</Link>
    );
  }