import { Component } from '@angular/core';


@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [],
  templateUrl: './recommendations.html',
  styleUrls: ['./recommendations.css']
})
export class Recommendations {

  tips = [
    {
      title: 'Increase Hospital Capacity',
      desc: 'Forecast shows rising cases. Consider adding beds and staff.'
    },
    {
      title: 'Focus on High-Risk Age Groups',
      desc: 'Target preventive programs for most affected demographics.'
    },
    {
      title: 'Strengthen Regional Monitoring',
      desc: 'Deploy resources in high-spread regions proactively.'
    },
    {
      title: 'Promote Preventive Healthcare',
      desc: 'Encourage early screening and awareness campaigns.'
    }
  ];

}