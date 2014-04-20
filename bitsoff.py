import os, re
clear = lambda: os.system("clear")

w = 5
h = 5

problems = [[4,8,9,14],
			[15,19,20,21,23,24],
			[0,1,3,4,6,7,8,11,12,13,17],
			[1,5,6,11,12,13,15,16,21],
			[0,4,6,8,11,13]]

def click(x,y, atual):
	cima = 5*(y-1)+x
	if cima >= 0: atual[cima] = int(not atual[cima])
	baixo = 5*(y+1)+x
	if baixo < len(atual): atual[baixo] = int(not atual[baixo])
	direita = 5*y+x+1
	if direita%w != 0: atual[direita] = int(not atual[direita])
	esquerda = 5*y+x-1
	if x != 0: atual[esquerda] = int(not atual[esquerda])
	atual[5*y+x] = int(not atual[5*y+x])

def draw(atual):
	clear()
	print " |%d|%d|%d|%d|%d" % tuple([i for i in range(w)])
	print "-----------"
	for y in range(h):
		string = ""+str(y) 
		for x in range(w):
			string += "|"+str(atual[5*y+x])
		print string

def verify(atual):
	for i in atual:
		if i != 0: return False
	return True

def receiving():
	cood_str = raw_input("Cood: ")
	cood = re.findall(r'[0-4]',cood_str)
	return int(cood[0]), int(cood[1])

def construct(level):
	return [int(5*y+x in problems[level]) for y in range(h) for x in range(w)]

def main():
	level = 0
	while level < len(problems):
		atual = construct(level)
		b = False
		while not b:
			draw(atual)
			print "Level Atual: ", level+1
			cood = receiving()
			click(cood[0], cood[1], atual)
			b = verify(atual)
		print "You won level %d" % (level+1)
		raw_input()
		level+=1


main()