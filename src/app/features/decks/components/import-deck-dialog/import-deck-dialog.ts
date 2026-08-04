import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-import-deck-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './import-deck-dialog.html',
  styleUrl: './import-deck-dialog.scss',
})

export class ImportDeckDialog {

  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<ImportDeckDialog>);

  readonly form = this._fb.group({
    decklist: ['', Validators.required],
  });

  cancel(): void {
    this._dialogRef.close();
  }

  import(): void {

    if (this.form.invalid) {
      return;
    }

    this._dialogRef.close(this.form.value.decklist);

  }

}
