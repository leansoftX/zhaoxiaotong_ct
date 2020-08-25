import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FriendsList} from '../../../../../../fack-db/friends-list';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {
  @Output() chatCollapse = new EventEmitter();
  @Output() chatToggle = new EventEmitter();
  public friendsList: any;

  constructor() {
    this.friendsList = FriendsList.friends;
  }

  ngOnInit() {
  }

  chatOn(friendId) {
    this.chatToggle.emit(friendId);
  }

}
