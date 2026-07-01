import { Component } from '@angular/core';
import { SellsList } from "../sells-list/sells-list";

@Component({
  selector: 'app-sells-page',
  imports: [SellsList],
  templateUrl: './sells-page.html',
})
export class SellsPage {}
