import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  @Input() friends;
  @Output() chatOn = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public innerChatToggle(id) {
    this.chatOn.emit();
  }

}
