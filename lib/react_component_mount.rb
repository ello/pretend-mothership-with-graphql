class ReactComponentMount
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::TextHelper
  attr_accessor :output_buffer
  mattr_accessor :camelize_props_switch

  def setup(env)
  end

  def teardown(env)
  end

  def react_component(name, route, options = {}, &block)
    options = {tag: options} if options.is_a? Symbol
    props = camelize_props_key(props) if camelize_props_switch

    prerender_options = options[:prerender]
    if prerender_options
      block = Proc.new { concat React::ServerRendering.render(name, props, prerender_options) }
    end

    html_options = options.reverse_merge(data: {})
    html_options[:data].tap do |data|
      data[:react_class] = name
      data[:relay_route] = route
    end
    html_tag = html_options[:tag] || :div

    html_options.except!(:tag, :prerender)

    content_tag(html_tag, '', html_options, &block)
  end

  private

  def camelize_props_key(props)
    return props unless props.is_a? Hash
    props.inject({}) do |h, (k, v)|
      h[k.to_s.camelize(:lower)] = v.is_a(Hash) ? camelize_props_key(v) : v; h
    end
  end
end
