<script>
  export default {
    functional: true,
    render(h, ctx) {
      const { logo, title, collapsed, color } = ctx.props;
      return (
        //class = ant-pro-sider-menu-logo
        <div class="logo">
          <img src={logo} alt={title} />
          <h1 v-show={!collapsed} style={{ color }}>
            {title}
          </h1>
        </div>
      );
    }
  };
</script>
