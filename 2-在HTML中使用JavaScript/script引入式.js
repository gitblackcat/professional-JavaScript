function foo(){
	alert('这是引入式js');
	alert('</script>');
}

foo();

// 在引入式中写上"</script>"字符串，不会遇到嵌入式中的问题