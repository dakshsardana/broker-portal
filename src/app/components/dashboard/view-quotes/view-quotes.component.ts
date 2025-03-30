import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

// Dialog component defined in the same file
@Component({
  selector: 'app-quote-details-dialog',
  template: `
    <div class="quote-dialog">
      <h2 mat-dialog-title>
        <mat-icon>description</mat-icon>
        Quote Details
      </h2>

      <mat-dialog-content>
        <mat-list>
          <mat-list-item>
            <mat-icon matListItemIcon>person</mat-icon>
            <div matListItemTitle>Client</div>
            <div matListItemLine>{{ data.quote.fullName }}</div>
          </mat-list-item>

          <mat-divider></mat-divider>

          <mat-list-item>
            <mat-icon matListItemIcon>email</mat-icon>
            <div matListItemTitle>Email</div>
            <div matListItemLine>{{ data.quote.email }}</div>
          </mat-list-item>

          <mat-divider></mat-divider>

          <mat-list-item>
            <mat-icon matListItemIcon>security</mat-icon>
            <div matListItemTitle>Coverage Amount</div>
            <div matListItemLine>{{ data.quote.coverageAmount | currency:'USD':'symbol':'1.0-0' }}</div>
          </mat-list-item>

          <mat-divider></mat-divider>

          <mat-list-item>
            <mat-icon matListItemIcon>attach_money</mat-icon>
            <div matListItemTitle>Premium</div>
            <div matListItemLine>{{ data.quote.premium | currency:'USD':'symbol':'1.0-0' }}</div>
          </mat-list-item>

          <mat-divider></mat-divider>

          <mat-list-item>
            <mat-icon matListItemIcon>today</mat-icon>
            <div matListItemTitle>Valid Until</div>
            <div matListItemLine>{{ data.quote.validUntil | date:'mediumDate' }}</div>
          </mat-list-item>
        </mat-list>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onClose()">Close</button>
        <button mat-raised-button color="primary" (click)="onClose()">
          <mat-icon>send</mat-icon> Send to Client
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .quote-dialog {
      min-width: 400px;
    }
    .quote-dialog h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #3f51b5;
    }
    .mat-mdc-list-item {
      height: 60px !important;
    }
    .mat-mdc-list-item-icon {
      color: #3f51b5;
    }
    .mat-mdc-list-item-title {
      font-weight: 500 !important;
      color: #757575;
    }
    .mat-mdc-list-item-line {
      font-size: 1rem !important;
      color: #212121 !important;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule
  ]
})
export class QuoteDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QuoteDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quote: any }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

// Main ViewQuotesComponent
@Component({
  selector: 'app-view-quotes',
  templateUrl: './view-quotes.component.html',
  styleUrls: ['./view-quotes.component.css'],
  standalone: true,
  imports: [
    // Angular Material Modules
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    
    // Other required modules
    CommonModule,
    FormsModule
  ]
})
export class ViewQuotesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'coverage', 'premium', 'status', 'actions'];
  dataSource: MatTableDataSource<Quote>;
  filteredQuotes: Quote[] = [];
  searchTerm = '';
  selectedStatus = 'all';
  sortField = 'date';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  quotes: Quote[] = [
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      coverageAmount: 1000000,
      premium: 5000,
      status: 'sent',
      createdAt: new Date('2023-05-15'),
      validUntil: new Date('2023-06-15')
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      coverageAmount: 500000,
      premium: 2500,
      status: 'accepted',
      createdAt: new Date('2023-05-18'),
      validUntil: new Date('2023-06-18')
    },
    {
      id: '3',
      fullName: 'Michael Johnson',
      email: 'michael@example.com',
      coverageAmount: 2000000,
      premium: 8000,
      status: 'draft',
      createdAt: new Date('2023-05-20'),
      validUntil: new Date('2023-06-20')
    },
    {
      id: '4',
      fullName: 'Sarah Williams',
      email: 'sarah@example.com',
      coverageAmount: 750000,
      premium: 3750,
      status: 'expired',
      createdAt: new Date('2023-04-10'),
      validUntil: new Date('2023-05-10')
    },
    {
      id: '5',
      fullName: 'Robert Brown',
      email: 'robert@example.com',
      coverageAmount: 1500000,
      premium: 6500,
      status: 'sent',
      createdAt: new Date('2023-05-22'),
      validUntil: new Date('2023-06-22')
    }
  ];

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.quotes);
    this.filteredQuotes = [...this.quotes];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(): void {
    this.filteredQuotes = this.quotes.filter(quote => {
      const matchesSearch = this.searchTerm === '' || 
        quote.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        quote.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        quote.coverageAmount.toString().includes(this.searchTerm);
      
      const matchesStatus = this.selectedStatus === 'all' || 
        quote.status === this.selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
    
    this.dataSource.data = this.filteredQuotes;
  }

  applySorting(): void {
    this.filteredQuotes.sort((a, b) => {
      switch (this.sortField) {
        case 'name':
          return a.fullName.localeCompare(b.fullName);
        case 'premium':
          return a.premium - b.premium;
        case 'coverage':
          return a.coverageAmount - b.coverageAmount;
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    
    this.dataSource.data = [...this.filteredQuotes];
  }

  refreshQuotes(): void {
    console.log('Refreshing quotes...');
    this.applyFilter();
  }

  exportQuotes(): void {
    console.log('Exporting quotes...');
  }
  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ')
      .map(part => part[0]?.toUpperCase() || '')
      .join('');
  }

  viewQuoteDetails(id: string): void {
    const quote = this.quotes.find(q => q.id === id);
    if (quote) {
      this.dialog.open(QuoteDetailsDialogComponent, {
        width: '800px',
        data: { quote }
      });
    }
  }

  sendQuoteReminder(id: string): void {
    console.log(`Sending reminder for quote ${id}`);
  }

  duplicateQuote(id: string): void {
    console.log(`Duplicating quote ${id}`);
  }

  deleteQuote(id: string): void {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.quotes = this.quotes.filter(quote => quote.id !== id);
      this.applyFilter();
    }
  }
}

interface Quote {
  id: string;
  fullName: string;
  email: string;
  coverageAmount: number;
  premium: number;
  status: 'draft' | 'sent' | 'accepted' | 'expired';
  createdAt: Date;
  validUntil: Date;
}