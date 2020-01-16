const drawCollision = (ctx, { collisionX, collisionY, collisionRadio, color }) => {
  ctx.beginPath();
  ctx.setLineDash([5, 15]);
  ctx.arc(collisionX, collisionY, collisionRadio, 0, Math.PI * 2);
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.stroke();
};
