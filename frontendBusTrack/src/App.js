import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/list/List.jsx";
import New from "./pages/new/New.jsx";
import Single from "./pages/single/Single.jsx";
import Edit from "./pages/edit/Edit.jsx";
import { FormDirtyProvider } from "./components/context/FormDirtyContext.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import Login from "./pages/login/Login.jsx";
import SingleRoute from "./pages/single/SingleRoute.jsx";
import EditRoute from "./pages/edit/EditRoute.jsx";
import NewRoute from "./pages/new/NewRoute.jsx";
import EditStop from "./pages/stops/EditStop.jsx";
import ViewStop from "./pages/stops/ViewStop.jsx";

function App() {
  return (
    <div className="App">
      <FormDirtyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/">
                <Route index element={<Home />}></Route>
                <Route path="students">
                  <Route index element={<List slug="students" />}></Route>
                  <Route
                    path=":id"
                    element={<Single slug="students" />}
                  ></Route>
                  <Route
                    path=":id/edit"
                    element={<Edit slug="students" />}
                  ></Route>
                  <Route path="new" element={<New slug="students" />}></Route>
                </Route>
                <Route path="staffs">
                  <Route index element={<List slug="staffs" />}></Route>
                  <Route path=":id" element={<Single slug="staffs" />}></Route>
                  <Route
                    path=":id/edit"
                    element={<Edit slug="staffs" />}
                  ></Route>
                  <Route path="new" element={<New slug="staffs" />}></Route>
                </Route>
                <Route path="drivers">
                  <Route index element={<List slug="drivers" />}></Route>
                  <Route path=":id" element={<Single slug="drivers" />}></Route>
                  <Route
                    path=":id/edit"
                    element={<Edit slug="drivers" />}
                  ></Route>
                  <Route path="new" element={<New slug="drivers" />}></Route>
                </Route>
                <Route path="buses">
                  <Route index element={<List slug="buses" />}></Route>
                  <Route path=":id" element={<Single slug="buses" />}></Route>
                  <Route
                    path=":id/edit"
                    element={<Edit slug="buses" />}
                  ></Route>
                  <Route path="new" element={<New slug="buses" />}></Route>
                </Route>
                <Route path="announcements">
                  <Route index element={<List slug="announcements" />}></Route>
                  <Route
                    path=":id"
                    element={<Single slug="announcements" />}
                  ></Route>
                  <Route
                    path=":id/edit"
                    element={<Edit slug="announcements" />}
                  ></Route>
                  <Route
                    path="new"
                    element={<New slug="announcements" />}
                  ></Route>
                </Route>
                <Route path="schedules">
                  <Route index element={<List slug="schedules" />}></Route>
                  <Route
                    path=":id"
                    element={<Single slug="schedules" />}
                  ></Route>
                  <Route
                    path=":id/edit"
                    element={<Edit slug="schedules" />}
                  ></Route>
                  <Route path="new" element={<New slug="schedules" />}></Route>
                </Route>
                <Route path="routes">
                  <Route index element={<List slug="routes" />}></Route>
                  <Route
                    path=":id"
                    element={<SingleRoute slug="routes" />}
                  ></Route>{" "}
                  <Route
                    path=":id/edit"
                    element={<EditRoute slug="routes" />}
                  ></Route>{" "}
                  <Route
                    path="new"
                    element={<NewRoute slug="routes" />}
                  ></Route>
                  <Route
                    path=":id/viewStop"
                    element={<ViewStop slug="routes" />}
                  ></Route>{" "}
                  <Route
                    path=":id/editStop"
                    element={<EditStop slug="routes" />}
                  ></Route>
                </Route>{" "}
              </Route>{" "}
            </Route>
          </Routes>
        </BrowserRouter>{" "}
      </FormDirtyProvider>
    </div>
  );
}

export default App;
