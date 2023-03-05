import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu, Segment } from "semantic-ui-react";
import Cookies from "universal-cookie";
export default function NavbarLg({ destroySession, logged }) {
  const cookie = new Cookies();
  const [activeItem, setactiveItem] = useState("home");
  const handleItemClick = (e, { name }) => setactiveItem(name);
  return (
    <Segment inverted attached size="mini">
      <Menu inverted secondary>
        {logged ? (
          <>
            <Menu.Item
              name="Dashboard"
              active={activeItem === "Dashboard"}
              onClick={handleItemClick}
              as={Link}
              to="dashboard"
              className="home-link"
            />
            {cookie.get("role") === "true" ? (
              <>
                <Menu.Item
                  name="Fixes"
                  active={activeItem === "Fixes"}
                  onClick={handleItemClick}
                  as={Link}
                  to="fixes"
                />
                <Menu.Item
                  name="Reported"
                  active={activeItem === "Reported"}
                  onClick={handleItemClick}
                  as={Link}
                  to="reported"
                />
              </>
            ) : (
              <></>
            )}
            <Menu.Item
              name="Assigned"
              active={activeItem === "Assigned"}
              onClick={handleItemClick}
              as={Link}
              to="assigned"
            />
            <Menu.Item
              name="Report"
              active={activeItem === "Report"}
              onClick={handleItemClick}
              as={Link}
              to="report"
            />

            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={destroySession}
              position="right"
              style={{ background: "#BB3F3F" }}
            >
              Logout <Icon name="log out" style={{marginLeft:"5px"}}></Icon>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            name="Login"
            active={activeItem === "Login"}
            as={Link}
            to="login"
            position="right"
          />
        )}
      </Menu>
    </Segment>
  );
}
