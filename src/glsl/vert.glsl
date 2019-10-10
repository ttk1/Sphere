#version 300 es

const vec4 p[] = vec4[](
	vec4(1.0, -1.0, 0.0, 1.0),
	vec4(1.0, 1.0, 0.0, 1.0),
	vec4(-1.0, 1.0, 0.0, 1.0),
	vec4(-1.0, -1.0, 0.0, 1.0)
);

in float a;

void main() {
  gl_Position = p[gl_VertexID];
}
