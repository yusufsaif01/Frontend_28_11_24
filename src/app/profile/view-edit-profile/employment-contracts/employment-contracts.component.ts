import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmploymentContractListTableConfig } from './employment-contract-listing-table-conf';
@Component({
  selector: 'app-employment-contracts',
  templateUrl: './employment-contracts.component.html',
  styleUrls: ['./employment-contracts.component.scss']
})
export class EmploymentContractsComponent implements OnInit {
  public tableConfig: EmploymentContractListTableConfig = new EmploymentContractListTableConfig();
  public dataSource = new MatTableDataSource([
    {
      name: 'Bayern München',
      effective_date: '2 Jun 2020',
      expiry_date: '2 Jun 2020',
      created_by: 'Club',
      status: 'Completed'
    },
    {
      name: 'Bayern München',
      effective_date: '2 Jun 2020',
      expiry_date: '2 Jun 2020',
      created_by: '2 Jun 2020',
      status: 'Yet to start'
    },
    {
      name: 'Bayern München',
      effective_date: '2 Jun 2020',
      expiry_date: '2 Jun 2020',
      created_by: '2 Jun 2020',
      status: 'Pending'
    }
  ]);

  constructor() {}

  ngOnInit() {}
}
