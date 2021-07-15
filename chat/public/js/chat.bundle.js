// frappe.Chat
// Author - Nihal Mittal <nihal@erpnext.com>

import { ChatBubble, ChatList } from './components';
import { get_settings, setup_dependencies } from './components';
frappe.provide('frappe.Chat');

/** Spawns a chat widget on any web page */
frappe.Chat = class {
	constructor() {
		this.setup();
	}

	/** Set up all the required methods for chat widget */
	setup() {
		this.$app_element = $(document.createElement('div'));
		this.$app_element.addClass('chat-app');
		this.$chat_container = $(document.createElement('div'));
		this.$chat_container.addClass('chat-container').hide();
		$('body').append(this.$app_element);
		this.is_open = false;
		this.chat_bubble = new ChatBubble(this);
		this.$chat_container.appendTo(this.$app_element);
		get_settings().then((res) => {
			setup_dependencies(res.socketio_port);
			this.user = res.user;
			this.chat_list = new ChatList({
				$wrapper: this.$chat_container,
				user: this.user,
			});
			this.chat_list.render();
		});
	}

	/** Shows the chat widget */
	show_chat_widget() {
		this.is_open = true;
		this.$chat_container.fadeIn(250);
	}

	/** Hides the chat widget */
	hide_chat_widget() {
		this.is_open = false;
		this.$chat_container.fadeOut(300);
	}

	setup_events() {}
};

$(function () {
	if (frappe.session.logged_in_user) {
		const ha = new frappe.Chat();
	}
});
