## What I Learned in This Project

- Capturing the user’s location using the browser API.
- Using `localStorage` to store user data without needing `useEffect` to retrieve it.
- Replacing `useImperativeHandle` with `useEffect` to control the modal.
- Managing components with `ref` by using `useEffect`, since the DOM is not connected before the initial render.
- Shifting from imperative to declarative management of the modal using `useEffect`.
- Cleaning up timers within `useEffect`.
- Using `useCallback` to fix function references and prevent infinite loops.

## Demo website:

- https://farmerlin731.github.io/Place-Picker/
