// Balloon

const Balloon = {
  template: `<div class="conversation-balloon" :class="speaker">
  <div class="avatar">
    <p class="name">{{ name }}</p>
  </div>
  <p class="message">{{ message }}</p>
</div>`,
  props: {
    name: {
      type: String,
      required: true
    },
    speaker: {
      type: String,
      required: true,
      validator: value => {
        return ['my', 'other'].includes(value);
      }
    },
    message: {
      type: String,
      required: true
    }
  }
};

// ChatForm

const ChatForm = {
  template: `<div class="chat-form">
  <div class="form-container">
    <input type="text" class="message" v-model="message">
    <button class="submit" @click="submit">送信</button>
  </div>
</div>`,
  props: {
    applyEvent: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    submit () {
      this.$emit(this.applyEvent, this.message)
      this.message = '';
    }
  }
};

// Vue instance

const app = new Vue({
  el: '#app',
  components: {
    balloon: Balloon,
    chatForm: ChatForm
  },
  data () {
    return {
     chatLogs: [
         { name: 'わたしだよ', speaker: 'my', message: 'hello'.repeat(10) },
         { name: 'bot', speaker: 'other', message: 'hello world' }
      ]
    }
  },
  methods: {
    submit (value) {
      this.chatLogs.push({
        name: 'わたしだよ',
        speaker: 'my',
        message: value
      });

      this.botSubmit();
      this.scrollDown();
    },
    botSubmit () {
      setTimeout(() => {
        this.chatLogs.push({
          name: 'bot',
          speaker: 'other',
          message: 'hello world'
        });

        this.scrollDown();
      }, 1000);
    },
    scrollDown () {
      const target = this.$el.querySelector('.chat-timeline');
      setTimeout(() => {
       const height = target.scrollHeight - target.offsetHeight;
        target.scrollTop += 10;

        if (height <= target.scrollTop) {
          return;
        } else {
          this.scrollDown();
        }
      }, 0);
    }
  }
});
