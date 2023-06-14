import { React } from 'react';

export function NotFound() {
  const styles = {
    width: "100%",
    objectFit: "contain",
    maxHeight: "400px",
  };

  return (<div>
    <img style={styles} src="https://cdn.dribbble.com/users/1022481/screenshots/3018253/404-snow.gif" alt="" />
  </div>);
}
