/* /// <reference path="models/drag_drop_interfaces.ts"/>
/// <reference path="models/project_model.ts"/>
/// <reference path="state/project_state.ts"/>
/// <reference path="util/validation.ts"/>
/// <reference path="decorators/autobind.ts"/>

/// <reference path="components/project_input.ts"/>
/// <reference path="components/project_list.ts"/> */

import { ProjectInput } from "./components/project_input.js";
import { ProjectList } from "./components/project_list.js";

// namespace App {

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
// }

