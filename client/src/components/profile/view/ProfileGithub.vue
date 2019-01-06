<template>
  <div>
    <div v-if="githubData.status==='Not Found'">
      <h3 class="mb-4">Invalid username</h3>
    </div>
    <div v-else>
      <hr>
      <h3 class="mb-4">Latest Github Repos</h3>
      <div v-for="repo in githubData.repos" :key="repo.id" class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6">
            <h4>
              <a :href="repo.html_url" target="_blank" class="text-info">{{repo.name}}</a>
            </h4>
            <p>{{repo.description}}</p>
          </div>
          <div class="col-md-6">
            <span class="badge badge-info mr-1">Stars: {{repo.stargazers_count}}</span>
            <span class="badge badge-secondary mr-1">Watchers: {{repo.watchers_count}}</span>
            <span class="badge badge-success">Forks: {{repo.forks_count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { githubClientID, githubClientSecret } from "@/resource/keys";

export default {
  name: "profileGithub",
  props: {
    title: {
      type: String
    },
    githubUserName: {
      type: String
    }
  },
  data() {
    return {
      githubData: {
        clientID: "",
        clientSecret: "",
        count: 5,
        sort: "created asc",
        repos: [],
        status: ""
      }
    };
  },
  mounted() {
    let { clientID, clientSecret, count, sort } = this.githubData;
    clientID = githubClientID;
    clientSecret = githubClientSecret;

    fetch(
      `https://api.github.com/users/${
        this.githubUserName
      }/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`
    )
      .then(response => response.json())
      .then(data => {
        this.githubData.status = data.message;
        this.githubData.repos = data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
</style>