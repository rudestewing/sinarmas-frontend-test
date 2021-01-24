import ErrorsContext from "./ErrorsContext";
import FavouritesContext from "./FavouritesContext";

const providers = [
  ErrorsContext.Provider,
  FavouritesContext.Provider,
]

const combineProviders = (components) => {
  return components.reduce(
    (Accumulated, Current) => {
      return (props) => {
        return (
          <Accumulated>
            <Current>
              {props.children}
            </Current>
          </Accumulated>
        )
      }
    },
    (props) => <> {props.children} </>
  );
}

export default combineProviders(providers);
