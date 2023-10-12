import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserStateType } from "../../redux/reducers/userSlice";

function ProtectedComponent(props: PropsType): JSX.Element | null {
  const user = useSelector((state: { user: UserStateType }) => state.user);
  // use in production mode
  const redirectCondition = user.isUser === false && user.status === "error";

  // use in development mode
  // const redirectCondition = false;

  const navigate = useNavigate();
  useEffect(() => {
    console.log("protected route : user =", user);
    if (redirectCondition) {
      navigate(props.redirect || "/");
    }
  }, [redirectCondition, props.redirect]);
  return props.children;
}

type PropsType = {
  children: JSX.Element;
  redirect?: string;
  condition?: boolean;
};

export default ProtectedComponent;
