const app = new Vue({
  el: '#app',
  data() {
    return {
      activeLink: 'Home',
      isOpen: false,
      btnPosition: '0',
      activeUp: false,
      activeAnnounce: 'Announcement',
      activeAnnounce2: 'Members',
      posts: [],
      users: [],
      expandedEvents: [],
      upcomingEvents: [{
        event_id: 30,
        event_name: 'Career Expo',
        event_time: '2024-07-01T10:00:00',
        event_street: '123 Main St',
        event_city: 'New York',
        event_state: 'NY',
        event_zip: '10001',
        event_description: 'A great opportunity to network with potential employers.'
      }
      ],

      yourActivities: [{
        event_id: 90,
        event_name: 'Tech Conference',
        event_time: '2024-08-15T09:00:00',
        event_street: '456 Tech Ave',
        event_city: 'San Francisco',
        event_state: 'CA',
        event_zip: '94105',
        event_description: 'An annual conference showcasing the latest in technology.'
      }],
      showConfirmation: false,
      openDiv: 'YouX',
      members: [
        { id: 1, name: 'Tien Au', phone: '000', email: 'rightHand@gmail.com' },
        { id: 2, name: 'Edgar', phone: '050555555', email: 'Anime033@gmail.com' }
      ],
      acceptedMembers: []
    };
  },
  methods: {

    setActive(link) {
      this.activeLink = link;
      console.log(link);
      this.setAnnounce('Announcement');
      this.setAnnounce2('Members');
    },
    logout() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            console.log("Logout successful");
            window.location.href = '/';
          } else {
            console.error("Logout failed");
          }
        }
      };
      xhr.open('POST', '/logout', true);
      xhr.withCredentials = true;
      xhr.send();
    },
    handleScroll() {
      if (window.scrollY > 0 && window.innerWidth >= 1600) {
        this.activeUp = true;
      } else {
        this.activeUp = false;
      }
    },
    setAnnounce(type) {
      this.activeAnnounce = type;
      this.btnPosition = this.activeAnnounce === 'Announcement' ? '0' : '170px';
    },
    setAnnounce2(type) {
      this.activeAnnounce2 = type;
      this.btnPosition = this.activeAnnounce2 === 'Members' ? '0' : '170px';
      this.openDiv = this.activeAnnounce2 === 'Members' ? 'YouX' : 'Facebook';
    },
    moveToEvent(member) {
      this.acceptedMembers.push(member);
      const index = this.members.findIndex(m => m.id === member.id);
      if (index !== -1) {
        this.members.splice(index, 1);
      }
    },
    moveToMembers(acceptedMember) {
      this.members.push(acceptedMember);
      const index = this.acceptedMembers.findIndex(m => m.id === acceptedMember.id);
      if (index !== -1) {
        this.acceptedMembers.splice(index, 1);
      }
    },
    showConfirmationDialog() {
      this.showConfirmation = true;
    },
    deletePhoto() {
      this.showConfirmation = false;
    },
    cancelDelete() {
      this.showConfirmation = false;
    },
    fetchUpcomingEvents() {
      fetch('/upcoming-events')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.length === 0) {
            console.log("No upcoming events found.");
            this.upcomingEvents = [];
          } else {
            this.upcomingEvents = data;
            console.log("Fetched upcoming events:", data);
          }
        })
        .catch(error => {
          console.error('Error fetching upcoming events:', error);
        });
    },
    fetchUserActivity() {
      fetch('/yourActivit')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.length === 0) {

            console.log("No user activities found.");
            this.yourActivities = [];
          } else {
            this.yourActivities = data.map(activity => ({
              ...activity,
              organization: activity.organization || 'LTET'
            }));
            console.log("Fetched user activities:", data);
          }
        })
        .catch(error => {
          console.error('Error fetching user activities:', error);
        });
    },
    registerEvent(event) {


      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/register-event', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            console.log("Event registered successfully.");
            window.location.reload();
          } else {
            console.error('Error registering for event');
          }
        }
      }.bind(this);

      const requestBody = {
        event_name: event.event_name,
        event_time: event.event_time,
        event_id: event.event_id
      };

      xhr.send(JSON.stringify(requestBody));
    },

    removeActivity(activity) {
      fetch(`/remove-activity/${activity.event_id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error removing activity from the server');
          } else {
            console.log("Activity removed successfully.");
            this.yourActivities = this.yourActivities.filter(act => act.event_id !== activity.event_id);
            this.upcomingEvents = this.upcomingEvents.filter(event => event.event_id !== activity.event_id);
            window.location.reload();
            this.setActive('Organization');
          }
        })
        .catch(error => {
          console.error('Error removing activity:', error);
        });
    },


    delete_event(event) {
      const eventId = event.event_id;
      const url = `/delete-event/${eventId}`;

      fetch(url, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            // Remove the event from the upcomingEvents array

            this.upcomingEvents = this.upcomingEvents.filter(e => e.event_id !== eventId);
            console.log('Event deleted successfully');
          } else {
            console.error('Error deleting event:', response.status);
          }
        })
        .catch(error => {
          console.error('Error deleting event:', error);
        });
    },


    toggleEventDetails(event) {
      const eventId = event.event_id;
      const isExpanded = this.expandedEvents.includes(eventId);

      if (isExpanded) {
        this.expandedEvents = this.expandedEvents.filter(id => id !== eventId);
      } else {
        this.expandedEvents.push(eventId);
      }
    },
    eventDetailsVisible(event) {
      return this.expandedEvents.includes(event.event_id);
    },


    handleFormSubmit(event) {
      event.preventDefault();

      const formData = new FormData(document.getElementById('eventForm'));

      const data = {
        eventName: formData.get('eventName'),
        eventTime: formData.get('eventTime'),
        eventStreet: formData.get('eventStreet'),
        eventCity: formData.get('eventCity'),
        eventState: formData.get('eventState'),
        eventZip: formData.get('eventZip'),
        eventDescription: formData.get('eventDescription')
      };

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/pass-it-on-event', true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {

            alert("Event added successfully!");
            window.location.href = '/manager.html';
          } else {
            console.error("Error adding event");
          }
        }
      };

      xhr.send(JSON.stringify(data));
    }, handleFormSubmit1(event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const data = {
        subject: formData.get('subject')
      };

      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/pass-it-on', true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {

            alert("Event added successfully!");
            window.location.reload();
          } else {
            console.error("Error adding event");
          }
        }
      };

      xhr.send(JSON.stringify(data));
    }, removePost(post) {
      const xhr = new XMLHttpRequest();
      const url = '/removePost'; // Replace with your server endpoint

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // Success: remove post from local data
            const index = this.posts.indexOf(post);
            if (index !== -1) {
              this.posts.splice(index, 1);
            }
            console.log('Post removed successfully:', xhr.responseText);
          } else {
            // Error: handle error response
            console.error('Error removing post:', xhr.status, xhr.statusText);
          }
        }
      };

      const postData = JSON.stringify({ postId: post.id });
      xhr.send(postData);
    }


  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchUpcomingEvents();
    this.fetchUserActivity();
    //document.getElementById('eventForm').addEventListener('submit', this.handleFormSubmit);

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    fetch('/posts')
      .then(response => response.json())
      .then(posts => {
        this.posts = posts;
        console.log("Fetched posts:", posts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    fetch('/users')
      .then(response => response.json())
      .then(users => {
        this.users = users;
        console.log('hihi')
        console.log("Fetched users:", users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


});
